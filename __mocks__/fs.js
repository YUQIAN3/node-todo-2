
const fs=jest.genMockFromModule('fs')

const _fs=jest.requireActual('fs')
Object.assign(fs, _fs)
let readMocks = {}

fs.setReadFileMock = (path, error, data) => {
    readMocks[path] = [error, data]
    console.log(readMocks);
}

fs.readFile = (path, options, callback) => {
    if (callback === undefined) {callback = options}
    const a=path
    console.log(a);
    const b=path in readMocks
    console.log(b);
    if (path in readMocks) {
        callback(readMocks[path][0],readMocks[path][1])
        console.log('ha');
    } else{
         _fs.readFile(path, options, callback)
        console.log('fuck');
    }
}
let writeMocks = {}

fs.setWriteFileMock = (path, fn) => {
    writeMocks[path] = fn
}

fs.writeFile = (path, data, options, callback) => {
    if (path in writeMocks) {
        writeMocks[path](path, data, options, callback)
    } else {
        _fs.writeFile(path, data, options, callback)
    }
}

fs.clearMocks = () => {
    readMocks = {}
    writeMocks = {}
}

module.exports = fs
