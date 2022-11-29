const producto = document.getElementById("producto");

const getObtenerProductoUnico = (producto)=>{
    $.ajax({
        url:"http://localhost:3000/pedidos/api/productone",
        method:"POST",
        async:true,
        data:{producto:producto},

        success: function(response){
            console.log(response);
            const id = document.getElementById("idproducto");
            let idproducto = "";

            response.map((item)=>{
                idproducto = item.Id;
            })

            if (response.length > 0) {
                 id.value = idproducto;
            } else {
                id.value = "";
            }
        }
    });
}

const EventProduct = (e) =>{
    e.preventDefault();
    getObtenerProductoUnico(e.target.value);
}

producto.addEventListener("keyup",EventProduct);