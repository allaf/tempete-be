import * as mongoose from 'mongoose';

export const mangoProviders = [
  {
    provide: 'MANGO_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/tempete'),
  },
];
