import App from './SLAcontainer.svelte';

export let app; // Declare at the top level

document.addEventListener('alertRendered', (event) => {
  console.log('alertRendered event received');
  console.log("alertData22 "+event.detail.alertStatusID);
  const containers = document.querySelectorAll('.SLAcontainer');
  console.log(containers);
  if (containers) {
    containers.forEach((container) => {
      // Check if the container already has the "mounted" class
      if (container.classList.contains("mounted")) {
        console.log('SLA component already mounted on this container');
        return;
      }
      app = new App({
        target: container,
        props: {
          IRIStime: event.detail.IRIStime,
          alertStatusID: event.detail.alertStatusID
        }
      });
      console.log('Svelte component mounted:', app);
      // Mark the container by adding a "mounted" class so we don't mount again.
      container.classList.add("mounted");
    });
  }
});