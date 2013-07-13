module.exports = function(app) {

    var ProjectService = require('../services/project.js');

    // GET - Return all projects in the DB
    findAllProjects = function(req, res) {

        console.log('GET - findAllProjects');

        ProjectService.findProjects({

            onSuccess: function(projects) {
                res.jsonp(projects);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // GET - Return a project with specified ID
    findProject = function(req, res) {

        var projectId = req.params.id;
        console.log('GET - findProjectById - projectId=' + projectId);

        ProjectService.findProjectById({

            projectId: projectId,

            onSuccess: function(project) {
                res.jsonp(project);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // POST - Insert a new project in the DB
    addProject = function(req, res) {

        console.log('POST - addProject');

        ProjectService.saveProject({

            projectName:        req.body.projectName,
            projectImageUrl:    req.body.projectImageUrl,
            projectDescription: req.body.projectDescription,

            onSuccess: function(project) {
                res.jsonp(project);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // PUT - Update a register already exists
    updateProject = function(req, res) {
        
        var projectId = req.params.id;
        console.log('PUT - updateProject - projectId=' + projectId);

        ProjectService.findProjectByIdAndUpdate({

            projectId:          projectId,
            projectName:        req.body.projectName,
            projectImageUrl:    req.body.projectImageUrl,
            projectDescription: req.body.projectDescription,

            onSuccess: function(project) {
                res.jsonp(project);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // DELETE - Delete a project with specified ID
    deleteProject = function(req, res) {
        
        var projectId = req.params.id;
        console.log('DELETE - deleteProject - projectId=' + projectId);

        ProjectService.findProjectByIdAndRemove({

            projectId: projectId,

            onSuccess: function(project) {
                res.jsonp(project);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // Link routes and functions
    app.get('/project', findAllProjects);
    app.get('/project/:id', findProject);
    app.post('/project', addProject);
    app.put('/project/:id', updateProject);
    app.delete('/project/:id', deleteProject);

}