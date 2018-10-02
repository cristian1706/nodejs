const stockModel = require('../models/stockModel.js');

module.exports = function(app) {
	
	/* ----------------------------------- API DE PRODUCT -----------------------------------*/

	app.get('/product', (req, res) => {
		stockModel.getProducts((err, data) => {
			res.status(200).json(data);
		});
	});

	app.get('/product/:name', (req, res) => {
		const productData = {
			name: req.params.name,
		};
		stockModel.getProductByName(productData, (err, data) => {
			if (data.existe == true) {
				res.status(200).json({
					data: data.row
				})
			} else {
				res.status(404).json({
					success: false,
					msj: "No existe ese producto en la BD"
				})
			}
		});
	});

	app.post('/product', (req, res) => {
		const productData = {
			id: null,
			name: req.body.name,
			costprice: req.body.costprice,
			saleprice: req.body.saleprice,
			producttype: req.body.producttype
		};
		stockModel.getProductByName(productData, (err, data) => {
			if (data.existe == false) {
				stockModel.insertProduct(productData, (err, data) => {
					if (data && data.id_insertado) {
						res.json({
							success: true,
							msj: "Producto insertado",
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
					msj: "El nombre de producto ya existe en la BD"
				})
			}
		});
	});

	app.put('/product/:id', (req, res) => {
		const productData = {
			id: req.params.id,
			name: req.body.name,
			costprice: req.body.costprice,
			saleprice: req.body.saleprice,
			producttype: req.body.producttype
			
		};
		stockModel.updateProduct(productData, (err, data) => {
			if (data && data.msj == 'actualizado') {
				res.json({
					success: true,
					msj: `Producto ${req.params.id} actualizado`
				})
			} else {
				if (data.msj == 'no existe') {
					res.status(404).json({
						success: false,
						msj: "No existe ese id en la bd"
					})
				} else {
					if (data.msj == 'nombre ocupado') {
						res.status(550).json({
							success: false,
							msj: "El nombre de producto ya existe en la BD"
						}) 
					} else {
						res.status(500).json({
							success: false,
							msj: "Error al actualizar"
						})
					}
				}
			}
		});
	});

	app.delete('/product/:id', (req, res) => {
		stockModel.deleteProduct(req.params.id, (err, data) => {
			if (data && data.msj == 'borrado') {
				res.json({
					success: true,
					msj: `Producto ${req.params.id} eliminado`,
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


	/* ----------------------------------- API DE PRODUCTTYPE -----------------------------------*/


	app.get('/producttype', (req, res) => {
		stockModel.getProducttypes((err, data) => {
			res.status(200).json(data);
		});
	});

	app.get('/producttype/:initials', (req, res) => {
		const producttypeData = {
			initials: req.params.initials,
		};
		stockModel.getProducttypeByInitials(producttypeData, (err, data) => {
			if (data.existe == true) {
				res.status(200).json({
					data: data.row
				})
			} else {
				res.status(404).json({
					success: false,
					msj: "No existe ese tipo de producto en la BD"
				})
			}
		});
	});

	app.post('/producttype', (req, res) => {
		const producttypeData = {
			id: null,
			initials: req.body.initials,
			description: req.body.description
		};
		if (producttypeData.initials.length <= 5) {
			stockModel.getProducttypeByInitials(producttypeData, (err, data) => {
				if (data.existe == false) {
					stockModel.insertProducttype(producttypeData, (err, data) => {
						if (data && data.id_insertado) {
							res.json({
								success: true,
								msj: "Tipo de producto insertado",
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
						msj: "Las iniciales del tipo de producto ya existen en la BD"
					})
				}
			});
		} else {
			res.status(403).json({
				success: false,
				msj: "Las iniciales del tipo de producto deben contener como maximo 5 caracteres"
			})
		}
	});

	app.put('/producttype/:id', (req, res) => {
		const producttypeData = {
			id: req.params.id,
			initials: req.body.initials,
			description: req.body.description
		};
		if (producttypeData.initials.length <= 5) {
			stockModel.updateProducttype(producttypeData, (err, data) => {
				if (data && data.msj == 'actualizado') {
					res.json({
						success: true,
						msj: `Tipo de producto ${req.params.id} actualizado`
					})
				} else {
					if (data.msj == 'no existe') {
						res.status(404).json({
							success: false,
							msj: "No existe ese id en la bd"
						})
					} else {
						if (data.msj == 'iniciales ocupadas') {
							res.status(550).json({
								success: false,
								msj: "Las iniciales del tipo de producto ya existen en la BD"
							}) 
						} else {
							res.status(500).json({
								success: false,
								msj: "Error al actualizar"
							})
						}
					}
				}
			});
		} else {
			res.status(403).json({
				success: false,
				msj: "Las iniciales del tipo de producto deben contener como maximo 5 caracteres"
			})
		}
	});

	app.delete('/producttype/:id', (req, res) => {
		stockModel.getProductByProducttype(req.params.id, (err, data) => {
			if (data.existe == false) {
				stockModel.deleteProducttype(req.params.id, (err, data) => {
					if (data && data.msj == 'borrado') {
						res.json({
							success: true,
							msj: `Tipo de producto ${req.params.id} eliminado`,
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
			} else {
				res.status(403).json({
					success: false,
					msj: `El id ${req.params.id} esta asociado a un producto, primero borra ese producto o cambia su tipo de producto por otro`
				})
			}
		})
	});

	
};

