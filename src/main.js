import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Create new HTML tag.
// WebComponent
class VehicleSearchElement extends HTMLElement {
  connectedCallback() {
    // avoid mounting twice
    if (this._mounted) return
    this._mounted = true

    this._app = createApp(App)
    this._app.mount(this)
  }

  disconnectedCallback() {
    // clean up if element removed
    if (this._app) {
      this._app.unmount()
      this._app = null
      this._mounted = false
    }
  }
}

customElements.define('digital35-meinfahrzeugshop-suche', VehicleSearch)