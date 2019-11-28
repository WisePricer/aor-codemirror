import { CodeMirrorCore } from './CodeMirrorCore'
import { Controlled } from 'react-codemirror2'
import { Button } from '@material-ui/core'

const defaultProps = {
  label: 'Field Label',
  type: 'json',
  meta: {
    valid: true
  }
}

describe('CodeMirrorCore', () => {
  it('renders with defaults', () => {
    expect(shallow(<CodeMirrorCore {...defaultProps} />)).toMatchSnapshot()
  })

  it('renders with errors', () => {
    expect(shallow(<CodeMirrorCore {...defaultProps} meta={{ valid: false, error: 'Field error!' }} />)).toMatchSnapshot()
  })

  it('renders controlled', () => {
    const value = 'original value'
    const onChange = jest.fn()
    const wrapper = shallow(<CodeMirrorCore {...defaultProps} input={{ value, onChange }} />)
    expect(wrapper).toMatchSnapshot()

    const newValue = 'new value'
    wrapper.find(Controlled).simulate('beforeChange', null, null, newValue)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(newValue)
  })

  it('formats value', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<CodeMirrorCore {...defaultProps} input={{ value: '{"foo":"bar"}', onChange }} />)

    wrapper.find(Button).simulate('click')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(`{
  "foo": "bar"
}`)
  })
})
