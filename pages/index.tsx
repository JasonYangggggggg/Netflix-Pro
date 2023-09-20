import {getSession, signOut} from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
export async function getServerSideProps(context:NextPageContext){
  const session = await getSession(context);

  if(!session){
    return{
      redirect:{
        destination: '/auth',
        permanent:false,
      }
    }
  }

  return {
    props:{}
  }
}
export default function Home() {
//const{data:user} = useCurrentUser();
const{data:movies =[]} = useMovieList(); 
const{data:favorites = []} = useFavorites();
  return (
    <>
    <div>
    <Navbar />
    <Billboard />
    <div className="pb-40">
    <MovieList title="Trending now" data={movies} />
    <MovieList title="My List" data={favorites} />
    </div>
    <div className="px-4 md:px-12 mt-4 space-y-8">
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                 Youtube Video List       
                </p>
                <div className="grid grid-cols-4 gap-5">
                <div className="group bg-zinc-900 col-span relative h-[15vw] w-[15vw]">
                <iframe width="400" height="315" src="https://www.youtube.com/embed/TxHITqC5rxE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write;encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen ="true"></iframe>
                </div>
                <div className="group bg-zinc-900 col-span relative h-[15vw] w-[15vw]">
                <iframe width="400" height="315" src="https://www.youtube.com/embed/mqqft2x_Aa4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen = "true"></iframe>
                </div>
                
                
            </div>
            </div>

        </div>
    </div>
    </>
  )
}
