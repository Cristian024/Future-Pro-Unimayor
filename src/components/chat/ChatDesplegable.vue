<script setup>
import { ref } from 'vue'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/common/ui/collapsible'
import Button from '@/common/ui/button/Button.vue';
import { ChevronsUpDown } from 'lucide-vue-next';

const isOpen = ref(false)

defineProps({
    user: {
        type: Object,
        required: true,
        default: { name: 'Usuario' }
    }
})

</script>

<template>
    <Collapsible v-model:open="isOpen" class="w-[350px] space-y-2">
        <div class="flex items-center justify-between space-x-4  cursor-pointer rounded-md border">
            <CollapsibleTrigger as-child class="w-full h-full px-4 py-3">
                <h4 class="">
                    {{ user.name }}
                </h4>
                <Button variant="ghost" size="sm" class="w-9 p-0">
                    <ChevronsUpDown class="h-4 w-4" />
                    <span class="sr-only">Toggle</span>
                </Button>
            </CollapsibleTrigger>
        </div>
        <CollapsibleContent class="space-y-2">
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/colors
            </div>
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
                @stitches/react
            </div>
        </CollapsibleContent>
    </Collapsible>
</template>

<script>

export default {
    props: {
        user: null
    }
}
</script>

<style scoped></style>