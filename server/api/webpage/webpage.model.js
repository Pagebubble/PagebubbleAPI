import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import {registerEvents} from './webpage.events';

var WebpageSchema = new mongoose.Schema({
  url: String,
  domain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Domain',
    index: true
  },
  requestingUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  }],
  active: {
    type: Boolean,
    default: true
  }
});

WebpageSchema.plugin(timestamps);
registerEvents(WebpageSchema);
export default mongoose.model('Webpage', WebpageSchema);
