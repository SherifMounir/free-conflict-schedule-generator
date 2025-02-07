export default function ({ store, redirect, app }) {
    // If the user is not authenticated
    if (!store.$auth.$state.loggedIn) {
      return redirect('/');
    }

  }
  
  
  