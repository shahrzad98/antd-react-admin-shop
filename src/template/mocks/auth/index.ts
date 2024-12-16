import profile from './profile.json';

const isAuthenticated = (): boolean => !!profile;

const setLoginOpen = (param: boolean): boolean => {
  console.log('setLoginOpen fn');
  return param;
};

export default { profile, isAuthenticated, setLoginOpen };
