interface Contact {
  id: string;
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

/**
 * Crea un contacto vacío con un ID único.
 * Esta es una función de ejemplo y podría no ser necesaria para tu aplicación de Pokémon.
 * @returns {Promise<Contact>} Un objeto de contacto con valores predeterminados y un ID.
 */
export async function createEmptyContact(): Promise<Contact> {
  // Genera un ID único. En una aplicación real, esto podría venir de una base de datos.
  const id = Math.random().toString(36).substring(2, 9);
  const contact: Contact = {
    id: id,
    first: "",
    last: "",
    avatar: "",
    twitter: "",
    notes: "",
    favorite: false,
  };
  // En una aplicación real, aquí guardarías el contacto en el almacenamiento.
  console.log("Creando contacto vacío:", contact);
  return contact;
}
