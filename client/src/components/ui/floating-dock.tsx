
import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}: {
    items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
    desktopClassName?: string;
    mobileClassName?: string;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    transition: {
                                        delay: idx * 0.05,
                                    },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                            >
                                <a
                                    href={item.onClick ? undefined : item.href}
                                    key={item.title}
                                    onClick={item.onClick}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900 cursor-pointer"
                                >
                                    <div className="h-4 w-4">{item.icon}</div>
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
            >
                <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
    className?: string;
}) => {
    let mouseY = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseY.set(e.pageY)}
            onMouseLeave={() => mouseY.set(Infinity)}
            className={cn(
                "hidden flex-col items-center gap-4 rounded-2xl bg-gray-50 px-3 py-4 md:flex dark:bg-neutral-900 border border-border",
                className,
            )}
        >
            {items.map((item) => (
                <IconContainer mouseY={mouseY} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouseY,
    title,
    icon,
    href,
    onClick,
}: {
    mouseY: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
    onClick?: () => void;
}) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseY, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
        // Currently pageY is relative to document, but getBoundingClientRect is relative to viewport + scroll.
        // However, for fixed elements they might align.
        // Better to use clientY for viewport based if fixed.
        // For now assuming scroll isn't massive or element is fixed.
        // Actually framer-motion useMotionValue(e.pageY) includes scroll.
        // element.getBoundingClientRect().y is viewport relative. 
        // We need consistent coordinates. 
        // Let's assume the dock is fixed position, so use e.clientY would be better if we could change parent.
        // But parent uses e.pageY. 
        // Let's adjust bounds to be document relative: bounds.y + window.scrollY

        return val - (bounds.y + window.scrollY) - bounds.height / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    let heightTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [20, 40, 20],
    );

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    let widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <a href={onClick ? undefined : href} onClick={onClick} className="cursor-pointer">
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, x: -10, y: "-50%" }}
                            animate={{ opacity: 1, x: -60, y: "-50%" }}
                            exit={{ opacity: 0, x: -10, y: "-50%" }}
                            className="absolute top-1/2 left-0 w-fit -translate-y-1/2 rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center"
                >
                    {icon}
                </motion.div>
            </motion.div>
        </a>
    );
}
