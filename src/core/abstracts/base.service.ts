import {
  FilterQuery,
  Model,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
} from 'mongoose';

interface FindParams<T> {
  filter?: FilterQuery<T>;
  options?: QueryOptions;
  selects?: {
    [field in string & keyof T]?: number | boolean | string | object;
  };
}

export abstract class BaseService<TModel> {
  constructor(protected readonly model: Model<TModel>) {}

  async create(doc: Partial<TModel>, options?: SaveOptions) {
    const createdDoc = new this.model(doc);
    return createdDoc.save(options);
  }
  async find(params: FindParams<TModel> = {}) {
    return this.model
      .find(params?.filter, null, params?.options)
      .select(params?.selects)
      .lean();
  }

  async findOne(filter: FilterQuery<TModel>, options?: QueryOptions) {
    return this.model.findOne(filter, null, options).lean();
  }

  async count(params: FindParams<TModel> = {}) {
    return this.model.countDocuments(params?.filter).lean();
  }

  async updateOne(
    filter: FilterQuery<TModel>,
    update: UpdateQuery<TModel>,
    options?: QueryOptions,
  ) {
    return this.model.findOneAndUpdate(filter, update, {
      new: true,
      ...options,
    });
  }

  async deleteOne(filter: FilterQuery<TModel>, options?: QueryOptions) {
    return this.model.findOneAndDelete(filter, options);
  }
}
