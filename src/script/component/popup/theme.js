'use strict';

const React = require('react');
const Popup = appRequire('component/popup/popup');
const preferenceTheme = appRequire('preference/theme');

const enDash = '\u2013';

const ThemeSelection = React.createClass({
  componentDidMount: function() {
    React.findDOMNode(this).querySelector('input:checked').focus();
  },

  onChange: function(event) {
    preferenceTheme.set(event.target.value);
  },

  render: function() {
    return (
      <Popup>
        <div className="themes">
          {this.renderThemes()}
        </div>
      </Popup>
    );
  },

  renderThemes: function() {
    const activeId = this.props.theme.get('active');
    const builtinThemes = this.props.theme.get('builtin');

    return builtinThemes.map((theme) => {
      const id = theme.get('id');
      const checked = id === activeId;

      return (
        <div key={id} className="theme">
          <input type="radio" name="theme"
            id={id} value={id}
            checked={checked}
            onChange={this.onChange}
          />

          <label htmlFor={id}>
            <span className="name">{theme.get('name')}</span>
            <span> {enDash} </span>
            <span className="description">{theme.get('description')}</span>
          </label>
        </div>
      );
    });
  }
});

module.exports = ThemeSelection;
