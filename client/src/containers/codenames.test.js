import React from 'react'
import { shallow } from 'enzyme'

import Codenames from './codenames'

describe('unit tests for containers/codenames', () => {

    it('successfully retrieves codenames', () => {
        const mockFetch = jest.fn();
        const wrapper = shallow(<Codenames fetch={mockFetch} />);

        expect(wrapper).toBeDefined();
        expect(mockFetch).toHaveBeenCalledTimes(1);
    })
})