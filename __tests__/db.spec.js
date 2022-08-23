
const db = require('../db.js');
const fs = require('../__mocks__/fs');
jest.mock('fs')

describe('db', () => {
    afterEach(()=>{
        fs.clearMocks()
    })
    it('can read', async () => {
        const data = [{title: 'hi', done: true}]
        fs.setReadFileMock("/Users/zhengtianyu/1", null, JSON.stringify(data))

        const list = await db.read("/Users/zhengtianyu/1")
        console.log(list);
        console.log(data);
        expect(list).toStrictEqual([])
    })
    it('can write', async () => {
        let fakeFile
        fs.setWriteFileMock('/Users/zhengtianyu/yyy', (path, data, callback) => {
            fakeFile = data
            callback(null)
        })
        const list = [{title: '吃', done: true}, {title: '喝', done: true}]
        await db.write(list, '/Users/zhengtianyu/yyy')
        expect(fakeFile).toBe(undefined)
    })
})
