import getCodenames, { filterCodenames } from './get-codenames'
import { map } from 'lodash'

describe('unit tests for lib/get-codenames', () => {
    it('fetches an array of codenames', async () => {
        expect.assertions(1);
        const data = await getCodenames();
        expect(Array.isArray(data)).toBe(true)
    })
    it('is able to filter with year greater than 2000', async () => {
        const data = await getCodenames();
        const newData = filterCodenames(data, item => item.Year > 2000);

        map(newData, (val, idx) => {
            expect(val.Year > 2000).toBe(true);
        })
    })
    it('is able to filter with letter starting with \'A\'', async () => {
        const data = await getCodenames();
        const newData = filterCodenames(data, item => item.Codename.toLowerCase()[0] === 'a');

        map(newData, (val, idx) => {
            expect(val.Codename.toLowerCase()[0]).toBe('a')
        })
    })
    it('is able to filter with description of lengths less than 32 characters', async () => {
        const data = await getCodenames();

        const newData = filterCodenames(data, item => {
            const { Description } = item;
            return typeof Description === 'string' && Description.length < 32
        });        

        map(newData, (val, idx) => {
            expect(val.Description.length < 32).toBe(true)
        })
    })
}) 