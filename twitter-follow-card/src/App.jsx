import { TwitterFollowCard } from "./TwitterFollowCard";
export function App() {
  // Esta redundancia es solo para mostrar como pasar una funcion de un component padre a un hijo
  // tambien se pueden pasar elementos como props 
  const format= (username) => `@${username}`
  // tambien podrias usar una lista con map
  const usuarios= [
    { id:"123", name :"John Doe ",  inicialIsFollowing: true , formatUserName: format},
    { id:"467", name :"Fulano Perez", username: "fulano_perez", inicialIsFollowing: false , formatUserName: format}
  ]
  return (
    <>
        <TwitterFollowCard username="juan_gonzalez" inicialIsFollowing={false} formatUserName={format} >
          <strong>Juan Gonzales </strong>
        </TwitterFollowCard>
        {usuarios.map(usuario=><TwitterFollowCard {... usuario} key={usuario.id} >
          <strong>{usuario.name} </strong>
        </TwitterFollowCard>)}
    </>
  );
}