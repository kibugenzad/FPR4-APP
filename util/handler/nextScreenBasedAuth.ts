export type UserType = {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  registrationLevel?: number;
  id: string;
  category: "citizen" | "foreign-in" | "foreign" | "diaspora";
  file?: string;
};

export default function nextScreenBasedAuth(
  userLoggedIn: UserType,
  router: { navigate: (path: string) => void }
) {
  switch (userLoggedIn.registrationLevel) {
    case 1:
      router.navigate(`/address/${userLoggedIn.id}`);
      break;
    case 2:
      router.navigate(`(tabs)`);
      break;
    default:
      userLoggedIn.token ? router.navigate(`(tabs)`) : router.navigate(`/`);
      break;
  }
}
