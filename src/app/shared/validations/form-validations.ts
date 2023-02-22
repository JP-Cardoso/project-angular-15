import { FormControl, FormGroup } from "@angular/forms"

export class FormValidations {

    static equalsTo(ortherField: string) {
        const validator = (formControl: FormControl) => {
            if(ortherField == null) {
                throw new Error('É necessário informar um campo')
            }

            if(!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }

            const field = (<FormGroup>formControl.root).get(ortherField)

            if(!field) {
                throw new Error('É necessário informar um campo') 
            }

            if(field.value !== formControl.value) {
                return {equalsTo: ortherField}
            }

            // se não der erro retornamos null
            return null;
        }

        return validator
    }
}