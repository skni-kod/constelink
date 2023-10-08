// import { Fragment } from "react";

// import { Input } from "@/components/input";

// import { getSession } from "@/server/authentication/session";

// import { Message } from "./message";

// const ChatPage = async () => {
//   const session = await getSession();
//   const user = session.user;

//   return (
//     <div className="container mt-24 flex flex-col overflow-hidden rounded-2xl border-2 border-accent p-8">
//       <div className="mb-4 flex h-full flex-col gap-4 overflow-x-auto">
//         <h1 className="border-b-2 border-b-accent pb-8 text-center text-3xl font-bold">
//           Project chat
//         </h1>
//         {Array.from({ length: 15 }, (_, index) => (
//           <Fragment key={index}>
//             <Message
//               user={user}
//               right={true}
//               date="22:22"
//               message="Jak to jest być skrybą, dobrze? A, wie pan, moim zdaniem to nie ma tak, że dobrze, albo że niedobrze. Gdybym miał powiedzieć, co cenię w życiu najbardziej, powiedziałbym, że ludzi. Ludzi, którzy podali mi pomocną dłoń, kiedy sobie nie radziłem, kiedy byłem sam, i co ciekawe, to właśnie przypadkowe spotkania wpływają na nasze życie. Chodzi o to, że kiedy wyznaje się pewne wartości, nawet pozornie uniwersalne, bywa, że nie znajduje się zrozumienia, które by tak rzec, które pomaga się nam rozwijać. Ja miałem szczęście, by tak rzec, ponieważ je znalazłem, i dziękuję życiu! Dziękuję mu; życie to śpiew, życie to taniec, życie to miłość! Wielu ludzi pyta mnie o to samo: ale jak ty to robisz, skąd czerpiesz tę radość? A ja odpowiadam, że to proste! To umiłowanie życia. To właśnie ono sprawia, że dzisiaj na przykład buduję maszyny, a jutro – kto wie? Dlaczego by nie – oddam się pracy społecznej i będę, ot, choćby, sadzić... doć— m-marchew..."
//             />
//             <Message
//               user={user}
//               date="22:22"
//               message="Jak to jest być skrybą, dobrze? A, wie pan, moim zdaniem to nie ma tak, że dobrze, albo że niedobrze. Gdybym miał powiedzieć, co cenię w życiu najbardziej, powiedziałbym, że ludzi. Ludzi, którzy podali mi pomocną dłoń, kiedy sobie nie radziłem, kiedy byłem sam, i co ciekawe, to właśnie przypadkowe spotkania wpływają na nasze życie. Chodzi o to, że kiedy wyznaje się pewne wartości, nawet pozornie uniwersalne, bywa, że nie znajduje się zrozumienia, które by tak rzec, które pomaga się nam rozwijać. Ja miałem szczęście, by tak rzec, ponieważ je znalazłem, i dziękuję życiu! Dziękuję mu; życie to śpiew, życie to taniec, życie to miłość! Wielu ludzi pyta mnie o to samo: ale jak ty to robisz, skąd czerpiesz tę radość? A ja odpowiadam, że to proste! To umiłowanie życia. To właśnie ono sprawia, że dzisiaj na przykład buduję maszyny, a jutro – kto wie? Dlaczego by nie – oddam się pracy społecznej i będę, ot, choćby, sadzić... doć— m-marchew..."
//             />
//           </Fragment>
//         ))}
//       </div>
//       <Input className="mt-8" placeholder="Enter your message" />
//     </div>
//   );
// };

// export default ChatPage;
