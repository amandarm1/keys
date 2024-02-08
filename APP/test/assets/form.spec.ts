import { RouterTestingModule } from '@angular/router/testing'
import { fireEvent, screen, render } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { FormComponent } from '../../src/app/assets/form/form.component'
import { FieldComponent } from '../../src/app/field/field.component'
import { MaterialModule } from '../../src/app/material.module'
import { AssetsService } from '../../src/services/assets'
import MyAssetService from '../stubs/myAssetService'

describe('The assets-form component', () => {
	beforeEach(async () => {
		await SUT.render()
	})

	it('starts with the submit button disabled', () => {
		const submitButton = SUT.retrieveSubmitButton()

		expect(submitButton).toBeDisabled()
	})

	it('Enabled submit when fields are filled', () => {
		const anyValue: string = 'any value'

		SUT.fillOwner(anyValue)
		SUT.fillOrigin(anyValue)
		SUT.tab()

		const submitButton = SUT.retrieveSubmitButton()
		expect(submitButton).toBeEnabled()
	})

	it('contains an object', () => {
		const badLogin: string = '1234'

		SUT.fillOwner(badLogin)
		SUT.fillOrigin(badLogin)
		SUT.submit()

		expect.objectContaining({ asset: badLogin })
	})

	it('shows an error message when dont receives an object', () => {
		const badLogin: string = MyAssetService.badLogin

		SUT.fillOwner(badLogin)
		SUT.fillOrigin(badLogin)
		SUT.submit()
		
		const error = SUT.retrieveErrorMessage()
		expect(error).toHaveTextContent("Ya existe el activo")
	})
})

class SUT {
	public static async render() {
		await render(FormComponent, {
			declarations: [
				FieldComponent
			],
			imports: [
				MaterialModule,
				RouterTestingModule,
				TranslateTestingModule.withTranslations('es', require('../../src/assets/i18n/es.json'))
			],
			providers: [
				{ provide: AssetsService, useClass: MyAssetService }
			]
		})
	}

	public static fillOwner(value: string): void {
		const owner = this.retrieveOwnerField()
		userEvent.type(owner, value)
	}

	public static fillOrigin(value: string): void {
		const origin = this.retrieveOriginField()
		userEvent.type(origin, value)
	}

	public static retrieveSubmitButton(): HTMLElement {
		return screen.getByLabelText('submit')
	}

	public static retrieveOwnerField(): HTMLElement {
		return screen.getByLabelText('submit')
	}

	public static retrieveOriginField(): HTMLElement {
		return screen.getByLabelText('submit')
	}

	public static retrieveErrorMessage(): HTMLElement {
		return screen.getByLabelText('error')
	}

	public static submit(): void {
		fireEvent.click(this.retrieveSubmitButton())
	}

	public static tab(): void {
		userEvent.tab()
	}
}

