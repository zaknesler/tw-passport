<template>
    <div
        :class="{'hidden': !visible}"
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        tabindex="-1"
        role="dialog"
    >
        <div class="z-10">
            <slot></slot>
        </div>

        <div class="z-0 absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
    </div>
</template>

<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                required: true
            }
        }
    }
</script>
