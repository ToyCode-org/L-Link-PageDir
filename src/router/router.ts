import Router from "next/router";

export const goHome = () => {
  Router.push("/");
};

export const goCharactersInfo = (name: string) => {
  Router.push(`/character/${name}`);
};
