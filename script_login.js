// ELEMENTOS HTML
const btnAsesor = document.getElementById('btnAsesor');
const btnAdmin = document.getElementById('btnAdmin');
const formAsesor = document.getElementById('formAsesor');
const formAdmin = document.getElementById('formAdmin');

// Mostrar formularios según rol
btnAsesor.addEventListener('click', () => {
    formAsesor.classList.remove('oculto');
    formAdmin.classList.add('oculto');
});

btnAdmin.addEventListener('click', () => {
    formAdmin.classList.remove('oculto');
    formAsesor.classList.add('oculto');
});

// ============================
// ✅ LOGIN CON ROLES REALES
// ============================

async function login(email, password, rolEsperado) {
    try {
        const response = await fetch(`http://localhost:3001/users?email=${email}`);
        const users = await response.json();

        if (users.length === 0) {
            return { success: false, message: "Usuario no encontrado" };
        }

        const user = users[0];

        if (user.password !== password) {
            return { success: false, message: "Contraseña incorrecta" };
        }

        if (user.rol !== rolEsperado) {
            return { success: false, message: "No tienes permisos para este panel" };
        }

        const token = crearToken(user);
        return { success: true, token, user };

    } catch (error) {
        return { success: false, message: "Error del servidor" };
    }
}

// Crear token
function crearToken(user) {
    const datos = {
        id: user.id,
        email: user.email,
        nombre: user.name,
        rol: user.rol,
        expira: Date.now() + 86400000
    };

    return btoa(JSON.stringify(datos));
}

// Guardar token
function guardarToken(token) {
    localStorage.setItem('token', token);
}

// Mostrar mensaje
function mostrarMensaje(form, mensaje, tipo) {
    let alerta = form.querySelector('.msg');

    if (!alerta) {
        alerta = document.createElement('div');
        alerta.classList.add('msg');
        form.appendChild(alerta);
    }

    alerta.textContent = mensaje;
    alerta.className = `msg ${tipo}`;
}

// ============================
// ✅ EVENTOS DE FORMULARIO
// ============================

// ASESOR
formAsesor.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = formAsesor.correo.value;
    const password = formAsesor.contrasena.value;

    const resultado = await login(email, password, "Asesor");

    if (resultado.success) {
        guardarToken(resultado.token);
        mostrarMensaje(formAsesor, `Bienvenido, ${resultado.user.name}`, "success");
        setTimeout(() => location.href = "dashAsesor.html", 1000);
    } else {
        mostrarMensaje(formAsesor, resultado.message, "error");
    }
});

// ADMINISTRADOR
formAdmin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = formAdmin.correo.value;
    const password = formAdmin.contrasena.value;

    const resultado = await login(email, password, "Administrador");

    if (resultado.success) {
        guardarToken(resultado.token);
        mostrarMensaje(formAdmin, `Bienvenido Administrador, ${resultado.user.name}`, "success");
        setTimeout(() => location.href = "dashAdmin.html", 1000);
    } else {
        mostrarMensaje(formAdmin, resultado.message, "error");
    }
});
