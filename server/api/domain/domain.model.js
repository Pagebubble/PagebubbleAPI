import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import {registerEvents} from './domain.events';

var DomainSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: {
    type: Boolean,
    default: true
  }
});

DomainSchema.plugin(timestamps);
registerEvents(DomainSchema);
export default mongoose.model('Domain', DomainSchema);
