import { ActionReducerMapBuilder, AsyncThunk, Draft } from '@reduxjs/toolkit';

type Options<Store> = {
  namespace?: keyof Store;
  stateHandler: ((state: Draft<Store>, action) => Draft<Store>) | 'single' | 'multi';
};

// TODO: Pend with API Not Working
export function Reducer<Model, Store>(
  builder: ActionReducerMapBuilder<Store>,
  thunk: AsyncThunk<Model, any, any>,
  { namespace, stateHandler }: Options<Store>,
): void {
  builder.addCase(thunk.pending, (state) => {
    if (namespace) (state as Store)[namespace]['isPending'] = true;
    else (state as Store)['isPending'] = true;
  });

  builder.addCase(thunk.fulfilled, (state, action) => {
    if (typeof stateHandler === 'function') {
      state = stateHandler(state, action);
      //
      if (namespace) (state as Store)[namespace]['isPending'] = false;
      else (state as Store)['isPending'] = false;
    } else {
      const data: Model = action.payload;
      //
      if (namespace) {
        (state as Store)[namespace][stateHandler === 'single' ? 'item' : 'items'] = data;
        (state as Store)[namespace]['isPending'] = false;
      } else {
        (state as Store)[stateHandler === 'single' ? 'item' : 'items'] = data;
        (state as Store)['isPending'] = false;
      }
    }
  });

  builder.addCase(thunk.rejected, (state) => {
    if (namespace) {
      (state as Store)[namespace]['isPending'] = false;
      (state as Store)[namespace]['error'] = 'Error In Getting Data';
    } else {
      (state as Store)['isPending'] = false;
      (state as Store)['error'] = 'Error In Getting Data';
    }
  });
}
