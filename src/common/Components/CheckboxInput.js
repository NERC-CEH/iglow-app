import React from 'react';
import PropTypes from 'prop-types';
import {
  IonItemDivider,
  IonItem,
  IonLabel,
  IonList,
  IonCheckbox,
} from '@ionic/react';

class Component extends React.PureComponent {
  constructor(props) {
    super(props);
    this.selectedCheckboxes = new Set();
  }

  state = {
    isChecked: false,
  }

  
  onChange = e => {
    const { value } = e.target;
    const checkedboxes = [];
    if (this.selectedCheckboxes.has(value)) {
      this.selectedCheckboxes.delete(value);
    } else {
      this.selectedCheckboxes.add(value);
    }

    this.selectedCheckboxes.map(option => (
      checkedboxes.push(option)
    ));

    this.props.onChange(checkedboxes);
  };

  render() {
    const config = this.props.config || {};

    if (config._values) {
      const message = this.props.info || config.info;

      const selected = this.props.default || config.default;

      const generateInputs = selection =>
        selection.reduce((agg, option) => {
          if (option.values) {
            const divider = (
              <IonItemDivider key={option.value}>{option.value}</IonItemDivider>
            );
            return [...agg, divider, ...generateInputs(option.values)];
          }
          const input = (
            <IonItem key={option.label || option.value}>
              <IonLabel>{option.label || option.value}</IonLabel>
              <IonCheckbox
                value={option.value}
                checked={option.value === selected}
                onClick={this.onChange}
              />
            </IonItem>
          );

          return [...agg, input];
        }, []);

      const inputs = generateInputs(config._values);

      return (
        <div>
          {message && (
            <div className="info-message">
              <p>{message}</p>
            </div>
          )}

          <IonList lines="full">
            {inputs}
          </IonList>
        </div>
      );
    }

    const message = this.props.info || config.info;
    const { isChecked } = this.state;

    let { selection } = this.props;

    if (!selection) {
      selection = Object.keys(config.values).map(key => ({ value: key, isChecked: isChecked }));
      // add default
      config.default && selection.unshift({ value: config.default });
    }

    if (this.props.default) {
      this.props.default.map(option => (
        this.selectedCheckboxes.add(option)
      ));
    }

    const selected = selection.map(option => {
      if (this.selectedCheckboxes.some(item => item === option.value)) {
        option.isChecked = true;
      }
    });


    const inputs = selected.map(option => (
      <IonItem key={option.value}>
        <IonLabel>{option.value}</IonLabel>
        <IonCheckbox
          value={option.value}
          checked={option.isChecked}
          onClick={this.onChange}
        />
      </IonItem>
    ));

    return (
      <div>
        {message && (
          <div className="info-message">
            <p>{message}</p>
          </div>
        )}

        <IonList lines="full">
          {inputs}
        </IonList>
      </div>
    );
  }
}

Component.propTypes = {
  default: PropTypes.array,
  config: PropTypes.any.isRequired,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  selection: PropTypes.array,
};

export default Component;