import { LitElement, html } from "lit-element";
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from "../store";
import { cartTotalSelector, cartQuantitySelector } from "../reducers/shop";


class ShoppingChartBar extends connect(store)(LitElement) {
    static get properties() {
        return {
            _quantity: { type: Number },
            _total: { type: Number }
        };
    }

    constructor() {
        super();
        this._quantity = 0;
        this._total = 0;
    }

    // This is called every time something is updated in the store.
    stateChanged(state) {
        if (state.shop && state.shop.cart) {
            this._quantity = cartQuantitySelector(state);
            this._total = cartTotalSelector(state);
        }
    }

    render() {
        return html`
            <div>
                <span>Number of items in the cart: <b>${this._quantity}</b></span>
                <span style='padding-left:10px'><b>Total:</b> ${this._total}</span>
            </div>
        `;
    }
}

window.customElements.define('shopping-chart-bar', ShoppingChartBar);