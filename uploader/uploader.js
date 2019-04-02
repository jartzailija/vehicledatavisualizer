//TODO: EI OSAA KÄSITELLÄ LINEAMOUNTTIA PIENEMPIÄ MÄÄRIÄ, PITÄÄ KORJATA

const lineAmount = 200000;
const file = 'vehicledata.json';
const remoteUrl = 'http://localhost:9200/_bulk';

const fs = require('fs');
const {
  Writable
} = require('stream');
const {
  StringDecoder
} = require('string_decoder');
const EventEmitter = require('events');
const request = require('request');

class LimitedBuffer {
  constructor() {
    this.str = "";
    this.lineNumber = 0;
    this._ready = false;
  }

  addData(data, lineCount) {
    this.str += data;
    this.lineNumber += lineCount;
  }

  set ready(val) {
    this._ready = val;
  }

  get ready() {
    return this._ready;
  }

  get lineCount() {
    return this.lineNumber;
  }

  set lineCount(count) {
    this.lineNumber = count;
  }

  get data() {
    return this.str;
  }

  set data(data) {
    this.str = data;
  }
}

class BufferController {
  constructor(emitter) {
    this.buffers = [];
    this.emitter = emitter;
  }

  addData(data, lineCount) {
    if (this.buffers.length === 0 || this.buffers[this.buffers.length - 1].lineCount + lineCount > lineAmount) {
      if (this.buffers.length > 0) {
        this.buffers[this.buffers.length - 1].ready = true;
        this.emitter.emit('dataready', this.buffers.shift());
      }
      this._addBuffer();
    }

    this.buffers[this.buffers.length - 1].addData(data, lineCount);
  }

  _addBuffer() {
    this.buffers.push(new LimitedBuffer());
  }
}

class BufferDataEmitter extends EventEmitter {}

class DataSender extends Writable {
  constructor(opt) {
    super(opt);
    this.data = "";
    this.emitter = new BufferDataEmitter();
    this.bufferController = new BufferController(this.emitter);
    this._decoder = new StringDecoder(opt && opt.defaultEncoding);
    this.buffers = [];
    this.sendingStarted = false;

    this.emitter.on('dataready', buffer => {
      this.buffers.push(buffer.data);
      if (!this.sendingStarted) {
        this.sendingStarted = true;
        this._send(-1, this);
      }
    });

    if (lineAmount % 2 !== 0) {
      throw 'Uneven lineamount set.';
    }
  }

  _send(index, that) {

    if (index < that.buffers.length) {
      index++;
    } else {
      return;
    }

    if (that.buffers[index] !== undefined) {
      request({
        method: 'POST',
        url: remoteUrl,
        headers: {
          'Content-Type': 'application/x-ndjson'
        },
        body: that.buffers[index]
      }, (err, httpResponse, body) => {
        if (err) {
          console.log('err', err);
          return err;
        }
        that.buffers[index] = '';
        that._send(index, that);
      });
    }

  }

  _write(chunk, encoding, callback) {

    if (encoding === 'buffer') {
      const strChunk = this._decoder.write(chunk);
      this.data += strChunk;
      this._splitData();
    }
    callback();
  }

  _final(callback) {
    this.data += this._decoder.end();
    callback();
  }

  _splitData() {
    let index = -1;
    let lineCount = 0;
    let biggestIndex = -1
    let previousBiggestIndex = -1

    this.data.split('').forEach((char, i) => {
      if (char === '\n' && index === -1) {

        previousBiggestIndex = biggestIndex;
        biggestIndex = i + 1;
        lineCount++;

        if (lineCount === lineAmount) {
          index = i + 1;
        }
      }
    });

    //An even line count is needed to maintain proper x-ndjson functionality
    if (index === -1) {
      if (previousBiggestIndex !== -1 && biggestIndex !== -1) {
        if (lineCount % 2 === 0) {
          index = biggestIndex;
        } else {
          index = previousBiggestIndex;
          lineCount--;
        }
      } else {
        throw 'Unsuccessful data split.';
      }
    }

    this.bufferController.addData(this.data.slice(0, index), lineCount);
    this.data = this.data.split('').slice(index).join('');
  }
}

const ds = new DataSender();
const fileStream = fs.createReadStream(file);

fileStream
  .pipe(ds);
