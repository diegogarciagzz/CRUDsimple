
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Table,
  Button,
  Container,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, nombre: "Jorge Carranza", empresa: "Tec", edad: 30, pais: "México", contacto: "jorge@mail.com" },
  { id: 2, nombre: "Ramon Velez", empresa: "Banorte", edad: 45, pais: "México", contacto: "ramon@mail.com" },
  { id: 3, nombre: "Hugo Sanchez", empresa: "Real Madrid", edad: 38, pais: "España", contacto: "hugo@mail.com" },
  { id: 4, nombre: "Rafael Marquez", empresa: "Barcelona", edad: 42, pais: "España", contacto: "rafael@mail.com" },
  { id: 5, nombre: "Carlos Alcaraz", empresa: "Mallorca", edad: 19, pais: "España", contacto: "carlos@mail.com" },
  { id: 6, nombre: "N. Djokovic", empresa: "Serbia", edad: 34, pais: "Serbia", contacto: "djokovic@mail.com" },
  { id: 7, nombre: "Sergio Perez", empresa: "Cadillac", edad: 31, pais: "México", contacto: "sergio@mail.com" },
  { id: 8, nombre: "Max Verstapen", empresa: "Oracle Red Bull Racing", edad: 28, pais: "Países Bajos", contacto: "max@mail.com" },
  { id: 9, nombre: "Carlos Sainz", empresa: "Williams Racing", edad: 26, pais: "España", contacto: "sainz@mail.com" },
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      empresa: "",
      edad: "",
      pais: "",
      contacto: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].empresa = dato.empresa;
        arreglo[contador].edad = dato.edad;
        arreglo[contador].pais = dato.pais;
        arreglo[contador].contacto = dato.contacto;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Estás Seguro que deseas Eliminar el elemento " + dato.id
    );
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
<>
<Container className="mt-4">
  <h2 className="mb-3 text-primary">Gestión de Usuarios</h2>
  <Button color="success" className="mb-3" onClick={()=>this.mostrarModalInsertar()}>
    <i className="bi bi-plus-lg"></i> Crear nuevo
  </Button>
  <div className="card p-3">
    <Table striped hover responsive className="shadow-sm bg-white">
<thead>
<tr>
<th>ID</th>
<th>Nombre</th>
<th>Empresa</th>
<th>Edad</th>
<th>País</th>
<th>Contacto</th>
<th className="text-center">Acción</th>
</tr>
</thead>
<tbody>
{this.state.data.map((dato) => (
<tr key={dato.id}>
<td>{dato.id}</td>
<td>{dato.nombre}</td>
<td>{dato.empresa}</td>
<td>{dato.edad}</td>
<td>{dato.pais}</td>
<td>{dato.contacto}</td>
<td className="text-center">
<Button color="primary" onClick={() => this.mostrarModalActualizar(dato)}>Editar</Button>{" "}
<Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
</td>
</tr>
))}
</tbody>
</Table>
  </div>
</Container>

<Modal isOpen={this.state.modalInsertar} size="lg" centered>
<ModalHeader>
<div><h3 className="m-0">Insertar Usuario</h3></div>
</ModalHeader>
<ModalBody>
<FormGroup>
<label>Id: </label> 
<input className="form-control" readOnly type="text" value={this.state.data.length+1} />
</FormGroup> 
<FormGroup>
<label>Nombre: </label>
<input className="form-control" name="nombre" type="text" onChange={this.handleChange} />
</FormGroup> 
<FormGroup>
<label>Empresa: </label>
<input className="form-control" name="empresa" type="text" onChange={this.handleChange} />
</FormGroup>
<FormGroup>
<label>Edad: </label>
<input className="form-control" name="edad" type="number" onChange={this.handleChange} />
</FormGroup>
<FormGroup>
<label>País: </label>
<input className="form-control" name="pais" type="text" onChange={this.handleChange} />
</FormGroup>
<FormGroup>
<label>Contacto: </label>
<input className="form-control" name="contacto" type="text" onChange={this.handleChange} />
</FormGroup>
</ModalBody>
<ModalFooter>
<Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
<Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()}>Cancelar</Button>
</ModalFooter>
</Modal>

<Modal isOpen={this.state.modalActualizar} size="lg" centered>
<ModalHeader>
<div><h3 className="m-0">Editar Usuario</h3></div>
</ModalHeader>
<ModalBody>
<FormGroup>
<label>Id: </label>
<input
  className="form-control"
  readOnly
  type="text"
  value={this.state.form.id}
/>
</FormGroup>
<FormGroup>
<label>Nombre: </label>
<input
  className="form-control"
  name="nombre"
  type="text"
  onChange={this.handleChange}
  value={this.state.form.nombre}
/>
</FormGroup>
<FormGroup>
<label>Empresa: </label>
<input
  className="form-control"
  name="empresa"
  type="text"
  onChange={this.handleChange}
  value={this.state.form.empresa}
/>
</FormGroup>
<FormGroup>
<label>Edad: </label>
<input
  className="form-control"
  name="edad"
  type="number"
  onChange={this.handleChange}
  value={this.state.form.edad}
/>
</FormGroup>
<FormGroup>
<label>País: </label>
<input
  className="form-control"
  name="pais"
  type="text"
  onChange={this.handleChange}
  value={this.state.form.pais}
/>
</FormGroup>
<FormGroup>
<label>Contacto: </label>
<input
  className="form-control"
  name="contacto"
  type="text"
  onChange={this.handleChange}
  value={this.state.form.contacto}
/>
</FormGroup>
</ModalBody>
<ModalFooter>
<Button color="primary" onClick={() => this.editar(this.state.form)}>
  Editar
</Button>
<Button color="danger" onClick={() => this.cerrarModalActualizar()}>
  Cancelar
</Button>
</ModalFooter>
</Modal>
</>
    );
  }
}

export default App;
