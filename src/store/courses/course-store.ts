import { create } from 'zustand'

type NewCoursesState = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

export const useNewCourses = create<NewCoursesState>((set) => {
    return {
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false })
    }
});
