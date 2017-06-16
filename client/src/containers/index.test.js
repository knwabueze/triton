import React from 'react'
import { shallow } from 'enzyme'

import Index from './index'

describe('unit tests for containers/index.js', () => {
    it('doesn\'t blow up when rendered', () => {
        shallow(<Index />);
    })
    it('contains a call-to-action buttom', () => {
        const wrapper = shallow(<Index />);
        expect(wrapper.find('[className=\'cta\']')).toHaveProperty("length", 1);
    })
})