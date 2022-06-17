const socket = io()

const enviarMensaje = () => {
    const author = document.getElementById("author").value;
    const text = document.getElementById("text").value;
    const time = new Date()
    

    const mensaje = {
        author,
        text,
        time
       
    };
    socket.emit('new_message', mensaje);
    return false;
}


const enviarProducto = () => {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const imgURL = document.getElementById("imgURL").value;

    const producto = {
        name,
        price,
        imgURL
       
    };

    socket.emit('new_products', producto);
    return false;
}


const crearEtiquetasMensaje = (mensaje) => {
    const {
        author,
        text,
        time
      
    } = mensaje;
    return `
    
    <div>
        <strong style="color:blue">${author}  </strong>
        <sm style="color:brown">${time}  :  </sm>
        <em style="color:green">${text}    </em>
    </div>
    `;
}

const crearEtiquetaProducto = (producto) => {
    const {
        name,
        price,
        imgURL
      
    } = producto;
    console.log(producto);
    return `
    
    <tr>
    <td>${name}</td>
    <td>${price}</td>
    <td>
        
        <img src=${imgURL} alt="...">
    </td>
    </tr>
    `;
}



const agregarMensajes = (mensajes) => {
    const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(" ");
    document.getElementById("messages").innerHTML = mensajesFinal;
}

const agregarProductos = (productos) => {
    const productosFinal = productos.map(producto => crearEtiquetaProducto(producto)).join(" ");
    document.getElementById("tableProducts").innerHTML = productosFinal;
}

socket.on('messages', (messages) => agregarMensajes(messages));
socket.on('products', (products) => agregarProductos(products));


