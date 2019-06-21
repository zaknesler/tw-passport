<template>
    <div
        :class="{'hidden': !visible}"
        class="absolute top-0 left-0 w-full h-full flex"
        tabindex="-1"
        role="dialog"
        ref="modal"
    >
        <div class="m-auto max-w-md w-full z-10">
            <slot></slot>
        </div>

        <div @click="$emit('close')" class="z-0 absolute top-0 left-0 w-full h-full bg-black opacity-10" />
    </div>
</template>

<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                required: true
            }
        },

        watch: {
            visible() {
                if (this.visible) {
                    this.$refs.modal.focus()
                }
            }
        },

        mounted () {
            document.addEventListener('keydown', (event) => {
                if (this.visible && event.keyCode == 27) {
                    this.$emit('close')
                }
            })
        }
    }
</script>
