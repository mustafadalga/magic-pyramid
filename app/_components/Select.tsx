import Select, { GroupBase, Props as SelectProps } from 'react-select';

export interface OptionType {
    label: number;
    value: number;
}

interface CustomSelectProps extends Omit<SelectProps<OptionType, false, GroupBase<OptionType>>, 'options'> {
    options: Array<OptionType>;
    isClearable?: boolean;
}

const CustomSelect = ({ options, isClearable, ...restProps }: CustomSelectProps) => {
    return (
        <Select
            options={options}
            isClearable={isClearable}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary25: '#e0e7ff',//100
                    primary: '#a5b4fc',//300
                    neutral30: '#a855f7',
                    neutral40: '#111827',
                    neutral50: '#111827',
                    neutral70: '#111827',
                    neutral80: '#111827',
                },
            })}
            className="text-xs lg:text-sm"
            {...restProps}
        />
    );
};

export default CustomSelect;
