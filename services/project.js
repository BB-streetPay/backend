var Project = require('../models/project.js');

findProjects = function(options) {

    console.log('findProjects options=%j', options);

    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    Project.find().populate('payments').exec(function(error, projects) {
        
        if(!error) {

            if(projects) {

                console.log('projects=' + projects);
                options.onSuccess(projects);
            } else {

                var errorMessage = 'Projects not found';
                console.log('ERROR retrieving projects: ' + errorMessage);
                options.onError(errorMessage);
            }
        } else {

            console.log('ERROR retrieving projects: ' + error);
            options.onError(error);
        }
    });
};

findProjectById = function(options) {

    console.log('findProjectById options=%j', options);

    options.projectId = options.projectId || 0;
    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    Project.findById(options.projectId).populate('payments').exec(function(error, project) {

        if(!error) {

            if(project) {

                console.log('project=' + project);
                options.onSuccess(project);

            } else {
                
                var errorMessage = 'Project not found';
                console.log('ERROR retrieving project with projectId="' + options.projectId + '": ' + errorMessage);
                options.onError(errorMessage);
            }
        } else {

            console.log('ERROR retrieving project with projectId="' + options.projectId + '": ' + error);
            options.onError(error);
        }
    });
};

saveProject = function(options) {

    console.log('saveProject options=%j', options);

    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    var project = options.project || new Project({
        name:        options.projectName,
        imageUrl:    options.projectImageUrl,
        description: options.projectDescription
    });

    project.save(function(error, newProject) {

      if(!error && newProject) {

        console.log('project=' + newProject + ' saved');
        options.onSuccess(newProject);

      } else {

        console.log('ERROR saving project=' + project + ': ' + error);
        options.onError(error);
      }
    });
};

findProjectByIdAndUpdate = function(options) {

    console.log('findProjectByIdAndUpdate options=%j', options);

    findProjectById({
        projectId: options.projectId,
        onSuccess: function(project) {

            project.name         = options.projectName;
            project.imageUrl     = options.projectImageUrl;
            project.description  = options.projectDescription;
            project.payments     = options.projectPayments;

            saveProject({
                project: project,
                onSuccess: options.onSuccess,
                onError: options.onError
            });
        },
        onError : options.onError
    });

};

findProjectByIdAndRemove = function(options) {

    console.log('findProjectByIdAndRemove options=%j', options);

    console.log(options);

    findProjectById({
        projectId: options.projectId,
        onSuccess: function(project) {

            project.remove(function(error) {

                if(!error) {

                    console.log('project=' + project + ' removed');
                    options.onSuccess(project);

                } else {

                    console.log('ERROR removing project=' + project + ': ' + error);
                    options.onError(error);
                }
            });
        },
        onError : options.onError
    });

};

exports.findProjects               = findProjects;
exports.findProjectById            = findProjectById;
exports.saveProject                = saveProject;
exports.findProjectByIdAndUpdate   = findProjectByIdAndUpdate;
exports.findProjectByIdAndRemove   = findProjectByIdAndRemove;