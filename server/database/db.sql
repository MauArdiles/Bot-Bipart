--Tabla clientes
CREATE TABLE IF NOT EXISTS clients(
    cuit VARCHAR(255) NOT NULL PRIMARY KEY,
    cliente VARCHAR(255) NOT NULL,
    vep VARCHAR(255) NOT NULL,
    mensaje VARCHAR(255) NOT NULL,
    recordatorio VARCHAR(255) NOT NULL,
    contacto VARCHAR(255) NOT NULL,
    alternativo VARCHAR(255) NOT NULL,
    grupo VARCHAR(255) NOT NULL
);