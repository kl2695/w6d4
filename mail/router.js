class Router {
  constructor (node, routes) {
    this.node = node;
    this.routes = routes; 
    this.start(); 
  }
  
  start() {
    this.render();
    window.addEventListener('hashchange', this.render.bind(this));
  }
  
  render(event) {
    this.node.innerHTML = '';
    const component = this.activeRoute();
    if(component){
      this.node.appendChild(component.render()); 
    }
  }
  
  activeRoute() {
    return this.routes[window.location.hash.slice(1)];
  }
}

module.exports = Router; 