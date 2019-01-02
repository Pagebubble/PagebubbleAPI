'use strict';

import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import {registerEvents} from './thing.events';

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

ThingSchema.plugin(timestamps);
registerEvents(ThingSchema);
export default mongoose.model('Thing', ThingSchema);
