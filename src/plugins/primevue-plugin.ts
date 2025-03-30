import * as PrimeVueComponents from "primevue";

export default  {
  install(app: any) {
    Object.entries(PrimeVueComponents).forEach(([name, component]) => {
      if (name !== "default") { 
        app.component(`Prime${name}`, component);
      }
    });
  },
};
