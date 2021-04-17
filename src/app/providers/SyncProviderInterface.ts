export interface SyncProviderInterface<M> {
    // sync(model: M | Array<M>): M | Array<M>;
    syncOne(model: M): M | Promise<M>;
    syncAll(models: Array<M>): Array<M> | Promise<Array<M>>;

}
