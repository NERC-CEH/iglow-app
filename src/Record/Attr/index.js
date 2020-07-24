import React from 'react';
import PropTypes from 'prop-types';
import { IonContent, IonPage, NavContext } from '@ionic/react';
import AppHeader from 'Components/Header';
import RadioInput from 'Components/RadioInput';
import CheckboxInput from 'Components/CheckboxInput';
import Input from 'Components/Input';
import Textarea from 'Components/Textarea';
import { observer } from 'mobx-react';
import config from 'config';

@observer
class Component extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    match: PropTypes.object,
    savedSamples: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const { match, savedSamples } = props;

    const sampleID = match.params.id;
    this.attrName = match.params.attr;
    const sample = savedSamples.get(sampleID);
    this.sample = sample;
    this.occ = sample.occurrences.at(0);

       switch (this.attrName) {
          case 'date':
            this.model = this.sample;
            this.attrConfig = config.indicia.attrs.smp.date;
            break;
          case 'female':
            this.model = this.occ;
            this.attrConfig = config.indicia.attrs.occ[this.attrName];
            break;
          case 'male':
            this.model = this.occ;
            this.attrConfig = config.indicia.attrs.occ[this.attrName];
            break;
          case 'larvae':
            this.model = this.occ;
            this.attrConfig = config.indicia.attrs.occ[this.attrName];
            break;
          case 'certainty':
            this.model = this.occ;
            this.attrConfig = config.indicia.attrs.occ[this.attrName];
            break;
          case 'position':
            this.model = this.occ;
            this.attrConfig = config.indicia.attrs.occ[this.attrName];
            break;
          case 'comment':
            this.model = this.occ;
            this.attrConfig = config.indicia.attrs.occ[this.attrName];
            break;
          default:
            this.model = this.sample;
            this.attrConfig = config.indicia.attrs.smp[this.attrName];
       }

       const value = this.model.get(this.attrName);
       this.state = { currentVal: value };    
  }

  onChange = val => {
    this.setState({ currentVal: val });
    this.model.set(this.attrName, val);
    this.model.save();

      if (this.attrConfig.type === 'radio')  {
        this.context.goBack();
      }
    //}
  };

  onNumberChange = (val, radioWasClicked) => {
    if (!radioWasClicked) {
      this.setState({ currentVal: val[1] });
      this.model.set('number', val[1]);
      //this.model.set('number-ranges', null);
      this.model.save();
      return;
    }

    this.setState({ currentVal: val[0] });
    //this.model.set('number-ranges', val[0]);
    this.model.set('number', null);
    this.model.save();

    this.context.goBack();
  };

  getAttr = () => {
    switch (this.attrConfig.type) {
      case 'time':
        return (
          <Input
            type="time"
            config={this.attrConfig}
            default={this.state.currentVal}
            onChange={val => this.onChange(val)}
          />
        );
      case 'number':
        return (
          <Input
          type="number"
          config={this.attrConfig}
          default={this.state.currentVal}
          onChange={val => this.onChange(val)}
        />
        );
      case 'date':
        return (
          <Input
            type="date"
            config={this.attrConfig}
            default={this.state.currentVal}
            onChange={val => this.onChange(val)}
          />
        );
      case 'textarea':
        return (
          <Textarea
            config={this.attrConfig}
            info='Please add any extra info about this record.'
            default={this.state.currentVal}
            onChange={val => this.onChange(val)}
          />
        );

      case 'radio':
        return (
          <RadioInput
            config={this.attrConfig}
            default={this.state.currentVal}
            onChange={val => this.onChange(val)}
          />
        );

      case 'checkbox':
        return (
          <CheckboxInput
            config={this.attrConfig}
            default={this.state.currentVal}
            onChange={val => this.onChange(val)}
          />
        );
  
      default:
        // TODO: show 404
        return null;
    }
  };

  render() {
    return (
      <IonPage>
        <AppHeader title={this.attrConfig.label} />
        <IonContent id="record-edit-attr">{this.getAttr()}</IonContent>
      </IonPage>
    );
  }
}
export default Component;
