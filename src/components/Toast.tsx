import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { X, AlertTriangle, Check } from 'lucide-react';

const ToastContext = React.createContext<{
  success: (payload: object) => void;
  error: (payload: object) => void;
  default: (payload: object) => void;
    } | undefined>(undefined);

const ToastContextImpl = React.createContext<{
  toastElementsMapRef: React.MutableRefObject<Map<string, HTMLElement>>;
  sortToasts: () => void;
} | undefined>(undefined);

const ANIMATION_OUT_DURATION = 350;


export const Toasts = ({ children, ...props }: any) => {
  const [toasts, setToasts] = React.useState(new Map());
  const toastElementsMapRef = React.useRef(new Map());
  const viewportRef = React.useRef();

  const sortToasts = React.useCallback(() => {
    const toastElements = Array.from(toastElementsMapRef.current).reverse();
    const heights = [] as any;

    toastElements.forEach(([, toast], index) => {
      if (!toast) return;
      const height = toast.clientHeight;
      heights.push(height);
      const frontToastHeight = heights[0];
      toast.setAttribute('data-front', index === 0);
      toast.setAttribute('data-hidden', index > 2);
      toast.style.setProperty('--index', index);
      toast.style.setProperty('--height', `${height}px`);
      toast.style.setProperty('--front-height', `${frontToastHeight}px`);
      const hoverOffsetY = heights
        .slice(0, index)
        .reduce((res: any, next: any) => (res += next), 0);
      toast.style.setProperty('--hover-offset-y', `-${hoverOffsetY}px`);
    });
  }, []);

  const handleAddToast = React.useCallback((toast: any) => {
    setToasts((currentToasts) => {
      const newMap = new Map(currentToasts);
      newMap.set(String(Date.now()), { ...toast, open: true });
      return newMap;
    });
  }, []);

  const handleRemoveToast = React.useCallback((key: any) => {
    setToasts((currentToasts) => {
      const newMap = new Map(currentToasts);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const handleDispatchDefault = React.useCallback(
     (payload: any) => handleAddToast({ ...payload, status: 'default' }),
    [handleAddToast]
  );

  const handleDispatchSuccess = React.useCallback(
     (payload: any) => handleAddToast({ ...payload, status: 'success' }),
    [handleAddToast]
  );

  const handleDispatchError = React.useCallback(
     (payload: any) => handleAddToast({ ...payload, status: 'error' }),
    [handleAddToast]
  );

  React.useEffect(() => {
    const viewport = viewportRef.current as any;

    if (viewport) {
      const handleFocus = () => {
        toastElementsMapRef.current.forEach((toast) => {
          toast.setAttribute('data-hovering', 'true');
        });
      };

      const handleBlur = (event: any) => {
        if (!viewport.contains(event.target) || viewport === event.target) {
          toastElementsMapRef.current.forEach((toast) => {
            toast.setAttribute('data-hovering', 'false');
          });
        }
      };

      viewport.addEventListener('pointermove', handleFocus);
      viewport.addEventListener('pointerleave', handleBlur);
      viewport.addEventListener('focusin', handleFocus);
      viewport.addEventListener('focusout', handleBlur);
      return () => {
        viewport.removeEventListener('pointermove', handleFocus);
        viewport.removeEventListener('pointerleave', handleBlur);
        viewport.removeEventListener('focusin', handleFocus);
        viewport.removeEventListener('focusout', handleBlur);
      };
    }
  }, []);

  return (
    <ToastContext.Provider
      value={React.useMemo(
        () =>
          Object.assign(handleDispatchDefault, {
            success: handleDispatchSuccess,
            error: handleDispatchError
          }),
        [handleDispatchDefault, handleDispatchSuccess, handleDispatchError]
      ) as any}
    >
      <ToastContextImpl.Provider
        value={React.useMemo(
          () => ({
            toastElementsMapRef,
            sortToasts
          }),
          [sortToasts]
        )}
      >
        <ToastPrimitive.Provider {...props}>
          {children}
          {Array.from(toasts).map(([key, toast]) => (
            <Toast
              key={key}
              id={key}
              toast={toast}
              onOpenChange={(open: any) => {
                if (!open) {
                  toastElementsMapRef.current.delete(key);
                  sortToasts();
                  if (!open) {
                    setTimeout(() => {
                      handleRemoveToast(key);
                    }, ANIMATION_OUT_DURATION);
                  }
                }
              }}
            />
          ))}
          <ToastPrimitive.Viewport
            ref={viewportRef as any}
            className="ToastViewport"
          />
        </ToastPrimitive.Provider>
      </ToastContextImpl.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context) return context;
  throw new Error('useToast must be used within Toasts');
};
export const useToastContext = () => {
  const context = React.useContext(ToastContextImpl);
  if (context) return context;
  throw new Error('useToast must be used within Toasts');
};

const Toast = (props: any) => {
  const { onOpenChange, toast, id, ...toastProps } = props;
  const ref = React.useRef();
  const context = useToastContext();
  const { sortToasts, toastElementsMapRef } = context;
  const toastElementsMap = toastElementsMapRef.current;

  React.useLayoutEffect(() => {
    if (ref.current) {
      toastElementsMap.set(id, ref.current);
      sortToasts();
    }
  }, [id, sortToasts, toastElementsMap]);

  return (
    <ToastPrimitive.Root
      {...toastProps}
      ref={ref}
      type={toast.type}
      duration={toast.duration}
      className="ToastRoot"
      onOpenChange={onOpenChange}
    >
      <div className="ToastInner" data-status={toast.status}>
        <ToastStatusIcon status={toast.status} />
        <ToastPrimitive.Title className="ToastTitle">
          <p>Scheduled: Catch up</p>
        </ToastPrimitive.Title>
        <ToastPrimitive.Description className="ToastDescription">
          {toast.description}
        </ToastPrimitive.Description>
        <ToastPrimitive.Action
          className="ToastAction Button small green"
          altText="Goto schedule to undo"
        >
          Undo
        </ToastPrimitive.Action>
        <ToastPrimitive.Close aria-label="Close" className="ToastClose">
          <X />
        </ToastPrimitive.Close>
      </div>
    </ToastPrimitive.Root>
  );
};

const ToastStatusIcon = ({ status }: any) => {
  return status !== 'default' ? (
    <div style={{ gridArea: 'icon', alignSelf: 'start' }}>
      {status === 'success' && <Check />}
      {status === 'error' && <AlertTriangle />}
    </div>
  ) : null;
};
