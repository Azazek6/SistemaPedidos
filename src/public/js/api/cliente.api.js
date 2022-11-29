const cliente = document.getElementById("cliente");

const getObtenerClienteUnico = (cliente)=>{
    $.ajax({
        url:"http://localhost:3000/pedidos/api/clienteone",
        method:"POST",
        async:true,
        data:{cliente:cliente},

        success: function(response){
            const name = document.getElementById("client");
            const id = document.getElementById("idcliente");
            let namecliente = "";
            let idcliente = ""; 

            response.map((item)=>{
                namecliente = item.CliNombre;
                idcliente = item.Id
            })

            if (response.length > 0) {
                name.innerHTML = `Cliente: <span style="color:blue;"><b>${namecliente}</b></span>`;
                id.value = idcliente;
            } else {
                name.innerHTML = `Cliente:`
                id.value = "";
            }
        }
    });
}

const EventClient = (e) =>{
    e.preventDefault();
    getObtenerClienteUnico(e.target.value);
}

cliente.addEventListener("keyup",EventClient);