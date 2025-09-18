export interface Password {
  id?: string;          // Opcional, para bases de datos
  account_name: string;        // Nombre de la clave (ej: "Gmail")
  username: string;     // Usuario asociado
  password_encrypted: string;     // La contraseña
  url: string;
  notes?: string;       // Notas adicionales
  createdAt?: Date;     // Fecha de creación
}
