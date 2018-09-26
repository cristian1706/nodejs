const rrhhModel = require('../models/rrhhModel.js');

module.exports = function(app) {
	
	/* ----------------------------------- API DE EMPLOYEE -----------------------------------*/

	app.get('/employee', (req, res) => {
		rrhhModel.getEmployees((err, data) => {
			res.status(200).json(data);
		});
	});

	app.post('/employee', (req, res) => {
		const employeeData = {
			id: null,
			firstname: req.body.firstname,
			surname: req.body.surname,
			email: req.body.email,
			password: req.body.password,
			employeetype: req.body.employeetype
		};
		rrhhModel.getEmployeeByEmail(employeeData, (err, data) => {
			if (data.existe == false) {
				rrhhModel.insertEmployee(employeeData, (err, data) => {
					if (data && data.id_insertado) {
						res.json({
							success: true,
							msj: "Empleado insertado",
							data: data
						})
					} else {
						res.status(500).json({
							success: false,
							msj: "Error al insertar"
						})
					}
				});
			} else {
				res.status(550).json({
					success: false,
					msj: "El email ya existe en la BD"
				})
			}
		});
	});

	app.put('/employee/:id', (req, res) => {
		const employeeData = {
			id: req.params.id,
			firstname: req.body.firstname,
			surname: req.body.surname,
			email: req.body.email,
			password: req.body.password,
			employeetype: req.body.employeetype
		};
		rrhhModel.updateEmployee(employeeData, (err, data) => {
			if (data && data.msj == 'actualizado') {
				res.json({
					success: true,
					msj: `Empleado ${req.params.id} actualizado`
				})
			} else {
				if (data.msj == 'no existe') {
					res.status(404).json({
						success: false,
						msj: "No existe ese id en la bd"
					})
				} else {
					res.status(500).json({
						success: false,
						msj: "Error al actualizar"
					})
				}
			}
		});
	});

	app.delete('/employee/:id', (req, res) => {
		rrhhModel.deleteEmployee(req.params.id, (err, data) => {
			if (data && data.msj == 'borrado') {
				res.json({
					success: true,
					msj: `Empleado ${req.params.id} eliminado`,
				})
			} else {
				if (data.msj == 'no existe') {
					res.status(404).json({
						success: false,
						msj: "No existe ese id en la bd"
					})
				} else {
					res.status(500).json({
						success: false,
						msj: "Error al borrar"
					})
				}
			}
		});
	});


	/* ----------------------------------- API DE EMPLOYEETYPE -----------------------------------*/


	app.get('/employeetype', (req, res) => {
		rrhhModel.getEmployeetypes((err, data) => {
			res.status(200).json(data);
		});
	});

	app.post('/employeetype', (req, res) => {
		const employeetypeData = {
			id: null,
			initials: req.body.initials,
			description: req.body.description
		};
		rrhhModel.getEmployeetypeByInitials(employeeData, (err, data) => {
			if (data.existe === false) {
				rrhhModel.insertEmployeetype(employeetypeData, (err, data) => {
					if (data && data.id_insertado) {
						res.json({
							success: true,
							msj: "Tipo de empleado insertado",
							data: data
						})
					} else {
						res.status(500).json({
							success: false,
							msj: "Error al insertar"
						})
					}
				});
			} else {
				res.status(550).json({
					success: false,
					msj: "Las iniciales del tipo de empleado ya existen en la BD"
				})
			}
		});
	});

	app.put('/employeetype/:id', (req, res) => {
		const employeetypeData = {
			id: req.params.id,
			initials: req.body.initials,
			description: req.body.description
		};
		rrhhModel.updateEmployeetype(employeetypeData, (err, data) => {
			if (data && data.msj == 'actualizado') {
				res.json({
					success: true,
					msj: `Tipo de empleado ${req.params.id} actualizado`
				})
			} else {
				if (data.msj == 'no existe') {
					res.status(404).json({
						success: false,
						msj: "No existe ese id en la bd"
					})
				} else {
					res.status(500).json({
						success: false,
						msj: "Error al actualizar"
					})
				}
			}
		});
	});

	app.delete('/employeetype/:id', (req, res) => {
		rrhhModel.deleteEmployeetype(req.params.id, (err, data) => {
			if (data && data.msj == 'borrado') {
				res.json({
					success: true,
					msj: `Tipo de empleado ${req.params.id} eliminado`,
					data: data
				})
			} else {
				if (data.msj == 'no existe') {
					res.status(404).json({
						success: false,
						msj: "No existe ese id en la bd"
					})
				} else {
					res.status(500).json({
						success: false,
						msj: "Error al borrar"
					})
				}
			}
		});
	});	
}
