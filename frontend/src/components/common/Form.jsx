import React from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Form = ({ formControls, formData, setFormData, onSubmit, buttonText }) => {


  function renderInputsByCompType(getControlItem) {
    let elemnet = null;
    const value = formData[getControlItem.name] || '';

    switch (getControlItem.componentType) {
      case "input":
        elemnet = (
          <Input
            name={getControlItem.name}
            id={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={value}
            onChange={e=>setFormData({...formData,[getControlItem.name] : e.target.value})}
          />
        );
        break;

      case "select":
          elemnet = (
            <Select value={value} onValueChange={value=>setFormData({
              ...formData,[getControlItem.name]:value
            })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={getControlItem.placeholder}/>
                </SelectTrigger>
                <SelectContent>
                  {
                    getControlItem.options && getControlItem.options.length > 0 ? 
                    getControlItem.options.map(option=><SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>)
                    :null
                  }
                </SelectContent>
            </Select>
          );
          break;

        case "textarea":
            elemnet = (
              <Textarea
                value={value}
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.id}
                onChange={e=>setFormData({...formData,[getControlItem.name] : e.target.value})}
                />
            );
            break;

      default:
        elemnet = (
          <Input
            name={getControlItem.name}
            id={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={value}
            onChange={e=>setFormData({...formData,[getControlItem.name] : e.target.value})}
          />
        );
        break;
    }
    return elemnet;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3 ">
        {formControls.map((controlItem,idx) => (
          <div className="grid w-full gap-1.5" key={idx}>
            <label className=" font-semibold mb-1">{controlItem.label}</label>
            {renderInputsByCompType(controlItem)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-4 w-full">{buttonText || 'Submit'}</Button>
    </form>
  );
};

export default Form;
