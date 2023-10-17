import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzE3YzZmYzdlM2JjOGUzZmQzZmRjZGZkNTU0NTUyYiIsInN1YiI6IjYyM2FhZjRiMjExY2U1MDA0Nzg0ZWVhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9alb1DcRnWoBh0xEkBmMDau5ZlKdsl4gEGYb7lPzOhY",
      },
    }
  );

  return json(await url.json());
};

const MovieId = () => {
  const data: any = useLoaderData();

  return (
    <div className="min-h-screen p-10">
      <img
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        alt={data.title}
        className="h-[50vh] object-cover w-full rounded-lg"
      />
      <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>

      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium">
          <h1>
            <span className="underline">Homepage:</span>{" "}
            <Link to={data.homepage} target="_blank">
              Link
            </Link>
          </h1>

          <h1>
            <span className="underline">Original Language:</span>{" "}
            {data.original_language}
          </h1>

          <p>
            <span className="underline">Overview:</span> {data.overview}
          </p>

          <p>
            <span className="underline">Release Date:</span> {data.release_date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieId;
