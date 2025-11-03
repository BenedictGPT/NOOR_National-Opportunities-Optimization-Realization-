import { useState, useCallback } from 'react';

interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  onToggle: () => void;
}

/**
 * useDisclosure Hook
 * 
 * Manages modal/dialog state with convenient open/close functions
 * 
 * @param defaultOpen - Initial open state (default: false)
 * @returns Object with isOpen state and control functions
 * 
 * @example
 * ```tsx
 * const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
 * 
 * <Button onPress={onOpen}>Open Modal</Button>
 * <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
 *   <ModalContent>
 *     <ModalHeader>Title</ModalHeader>
 *     <ModalBody>Content</ModalBody>
 *     <ModalFooter>
 *       <Button onPress={onClose}>Close</Button>
 *     </ModalFooter>
 *   </ModalContent>
 * </Modal>
 * ```
 */
export function useDisclosure(
  defaultOpen: boolean = false
): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
    onToggle,
  };
}

export default useDisclosure;

