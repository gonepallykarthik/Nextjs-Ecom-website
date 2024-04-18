export async function validPass(pass: string, hashedPass: string) {
  console.log(await hashPassword(pass));
  return (await hashPassword(pass)) === hashedPass;
}

async function hashPassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  );

  return Buffer.from(arrayBuffer).toString("base64");
}
